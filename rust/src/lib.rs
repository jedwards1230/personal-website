use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Universe {
    cells: Vec<usize>,
    prev_cells: Vec<usize>,
    width: u32,
    height: u32,
    resolution: u32,
    style: Option<CellStyle>,
    paint_background: bool,
}

struct CellStyle {
    primary_color: JsValue,
    secondary_color: JsValue,
    inactive_color: JsValue,
}

impl Universe {
    #[inline]
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    #[inline]
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let top = if row == 0 { self.height - 1 } else { row - 1 };
        let down = if row == self.height - 1 { 0 } else { row + 1 };

        let left = if column == 0 {
            self.width - 1
        } else {
            column - 1
        };

        let right = if column == self.width - 1 {
            0
        } else {
            column + 1
        };

        let mut count = 0;

        let nw = self.get_index(top, left);
        if self.cells[nw] > 0 {
            count += 1;
        }

        let n = self.get_index(top, column);
        if self.cells[n] > 0 {
            count += 1;
        }

        let ne = self.get_index(top, right);
        if self.cells[ne] > 0 {
            count += 1;
        }

        let w = self.get_index(row, left);
        if self.cells[w] > 0 {
            count += 1;
        }

        let e = self.get_index(row, right);
        if self.cells[e] > 0 {
            count += 1;
        }

        let sw = self.get_index(down, left);
        if self.cells[sw] > 0 {
            count += 1;
        }

        let s = self.get_index(down, column);
        if self.cells[s] > 0 {
            count += 1;
        }

        let se = self.get_index(down, right);
        if self.cells[se] > 0 {
            count += 1;
        }

        count
    }

    #[inline]
    fn paint_cell(&self, ctx: &web_sys::CanvasRenderingContext2d, row: u32, col: u32) {
        let res = self.resolution as f64;
        ctx.fill_rect(
            col as f64 * res,
            row as f64 * res,
            res,
            res,
        );
    }

    fn paint(&mut self, idx: usize, ctx: &web_sys::CanvasRenderingContext2d) {
        let style = self.style.as_ref().unwrap();
        let cell = self.prev_cells[idx];
        match cell {
            1 => ctx.set_fill_style(&style.primary_color),
            2 => ctx.set_fill_style(&style.secondary_color),
            _ => ctx.set_fill_style(&style.inactive_color),
        }
        let row = (idx / self.width as usize) as u32;
        let col = (idx % self.width as usize) as u32;
        if cell > 0 {
            self.paint_cell(&ctx, row, col)
        } else {
            self.paint_cell(&ctx, row, col)
        }
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: u32, height: u32, resolution: u32) -> Universe {
        let size = (width * height) as usize;
        let mut cells: Vec<usize> = vec![0; size];
        let prev_cells = vec![0; size];

        for i in 0..size {
            let rand_num = rand::thread_rng().gen::<f32>();
            if rand_num < 0.5 {
                cells[i] = 0;
            } else {
                cells[i] = 1;
            }
        }

        Universe {
            cells,
            prev_cells,
            width,
            height,
            resolution,
            style: None,
            paint_background: true,
        }
    }

    pub fn tick(&mut self, ctx: web_sys::CanvasRenderingContext2d) {
        if !self.style.is_some() {
            return;
        }

        let mut update_list: Vec<usize> = Vec::new();
        
        ctx.save();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                self.prev_cells[idx] = match (cell, live_neighbors) {
                    (0, 3) => {
                        update_list.push(idx);
                        1
                    }
                    (1 | 2, 2) => {
                        if cell != 2 {
                            update_list.push(idx);
                        }
                        2
                    }
                    (1 | 2, 3) => {
                        if cell != 1 {
                            update_list.push(idx);
                        }
                        1
                    }
                    (_, _) => {
                        if cell != 0 {
                            update_list.push(idx);
                        }
                        0
                    }
                };
            }
        }

        if self.paint_background {
            ctx.set_fill_style(&self.style.as_ref().unwrap().inactive_color);
            ctx.fill_rect(0.0, 0.0, self.width as f64 * self.resolution as f64, self.height as f64 * self.resolution as f64);

            for row in 0..self.height {
                for col in 0..self.width {
                    let idx = self.get_index(row, col);
                    self.paint(idx, &ctx)
                }
            }
            self.paint_background = false;
        } else {
            for idx in update_list {
                self.paint(idx, &ctx);
            }
        }        

        self.cells = self.prev_cells.to_vec();
        ctx.restore();
    }

    pub fn set_style(
        &mut self,
        primary_color: JsValue,
        secondary_color: JsValue,
        inactive_color: JsValue,
    ) {
        self.style = Some(CellStyle {
            primary_color,
            secondary_color,
            inactive_color,
        });
        self.paint_background = true;
    }
}
