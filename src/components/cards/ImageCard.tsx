import Image from 'next/image';

export default function ImageCard({ project }: { project: Project }) {
    return (
        <Image
            width={1920}
            height={1080}
            src={project.images[0]}
            alt={project.title}
            className="select-none"
        />
    );
}
