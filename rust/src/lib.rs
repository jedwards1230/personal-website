use rand::Rng;
use wasm_bindgen::prelude::*;

extern crate fixedbitset;
use fixedbitset::FixedBitSet;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct Universe {
    cells: FixedBitSet,
    width: u32,
    height: u32,
    resolution: u32,
    style: Option<CellStyle>,
}

struct CellStyle {
    primary_color: JsValue,
    secondary_color: JsValue,
    inactive_color: JsValue,
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let r = (row + delta_row + self.height) % self.height;
                let c = (column + delta_col + self.width) % self.width;

                let idx = self.get_index(r, c);
                count += self.cells[idx] as u8;
            }
        }
        count
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self, ctx: web_sys::CanvasRenderingContext2d) {
        if !self.style.is_some() {
            return;
        }
        let style = self.style.as_ref().unwrap();
        let mut next = self.cells.clone();
        ctx.save();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let res = self.resolution as f64;
                let live_neighbors = self.live_neighbor_count(row, col);

                match (cell, live_neighbors) {
                    (false, 3) => {
                        next.set(idx, true);
                        ctx.set_fill_style(&style.primary_color);
                    }
                    (true, 2) => {
                        next.set(idx, true);
                        ctx.set_fill_style(&style.secondary_color);
                    }
                    (true, 3) => {
                        next.set(idx, true);
                        ctx.set_fill_style(&style.primary_color);
                    }
                    (_, _) => {
                        next.set(idx, false);
                        ctx.set_fill_style(&style.inactive_color);
                    }
                }

                ctx.begin_path();
                ctx.arc(
                    col as f64 * res,
                    row as f64 * res,
                    res / 2.0,
                    0.0,
                    2.0 * std::f64::consts::PI,
                )
                .unwrap();
                ctx.fill();
            }
        }

        self.cells = next;
        ctx.restore();
    }

    pub fn new(width: u32, height: u32, resolution: u32) -> Universe {
        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, rand::thread_rng().gen::<f32>() > 0.5);
        }

        Universe {
            cells,
            width,
            height,
            resolution,
            style: None,
        }
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
        })
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }
}
