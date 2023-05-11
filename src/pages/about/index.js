import { useRouter } from "next/router";
import PageDescription from "@/components/PageDescription";
import { Button, Chip, Grid, Stack } from "@mui/material";


export default function AboutPage({ skills }) {

    const router = useRouter();

    return (
        <section>
            <PageDescription 
                title='About Me' 
                description="Hi, I'm Bryan Balderrama, a frontend engineer specializing in JavaScript technologies. I love creating immersive web experiences and have expertise in frameworks like React, Angular, and Vue.js. I'm passionate about clean code, user experience, and staying up to date with the latest trends. Let's connect and bring your ideas to life!"
            />
            {/*  Left column */}
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <h2>Get to know me!</h2>
                    <p>
                        I&lsquo;m a Frontend Web Developer building the Front-end of Websites and Web Applications that leads to the success of the overall product. Check out some of my work in the Projects section.
                    </p>
                    <p>
                        I also like sharing content related to the stuff that I have learned over the years in Web Development so it can help other people of the Dev Community. Feel free to Connect or Follow me on my Linkedin where I post useful content related to Web Development and Programming
                    </p>
                    <p>
                        I&lsquo;m open to Job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then don&lsquo;t hesitate to contact me.
                    </p>
                    <Button 
                        variant='contained'
                        size='large'
                        onClick={ () => router.push("/contact")}
                    >
                        Contact
                    </Button>
                </Grid>

                {/*  Right Column */}
                <Grid item md={6}>
                    <h2>My Skills</h2>
                    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                        { skills.map( skill => <Chip key={ skill } label={ skill }/>) }
                    </Stack>
                </Grid>
            </Grid>
        </section>


    )
}

export async function getStaticProps () {

    let skills = [];

    try {
        const response = await fetch("https://bryan-skills-api-7777-default-rtdb.firebaseio.com/skills.json");

        const data = await response.json();

        skills = data.split(',');

    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            skills,
        },
        revalidate: 30
    }
}