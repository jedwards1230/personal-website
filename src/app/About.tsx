export default function About() {
    return (
        <div id="about">
            <div className="text-xl font-medium md:hidden">About</div>
            <div className="space-y-4 dark:text-neutral-300 md:pt-16">
                <p>
                    My career began in 2015 as an Entertainment Technician, and
                    after seven years of diverse roles, I have grown into my
                    current role as a Full Stack Software Developer at{' '}
                    <a
                        href="https://atlantishealth.com/us/"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    >
                        <strong className="text-neutral-50">
                            Atlantis Health
                        </strong>
                    </a>
                    . Here, I use my skills in{' '}
                    <strong className="text-neutral-50">TypeScript</strong>,{' '}
                    <strong className="text-neutral-50">NextJs</strong>,{' '}
                    <strong className="text-neutral-50">Python</strong>, and{' '}
                    <strong className="text-neutral-50">SQL</strong> to lead
                    large-scale projects and drive innovation, such as
                    integrating{' '}
                    <strong className="text-neutral-50">IBM Watson</strong>'s
                    NLP capabilities into patient applications.
                </p>
                <p>
                    As I set my sights on the future, my aim is to push myself
                    further by undertaking larger and more complex projects. I
                    am confident that these challenges will allow me to further
                    hone my skills, broaden my expertise, and make larger
                    contributions to the tech industry.
                </p>
                <p>
                    In my downtime, I immerse myself in the world of fantasy and
                    sci-fi, stay active, and participate in trivia nights. These
                    activities, along with the companionship of my two cats, not
                    only provide personal enjoyment but also stimulate my
                    creative and problem-solving abilities in the realm of
                    software development.
                </p>
            </div>
        </div>
    );
}
