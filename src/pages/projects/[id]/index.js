import PageDescription from "@/components/PageDescription";
import { Box, Button, Chip, Grid } from "@mui/material";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

export default function Project({ project }){
    return <>
        <NextSeo
            title={ project.name }
            description={ project.description }
            openGraph={{
                title: 'title',
                description: 'Description',
                url: 'google.com',
                type: 'website'

            }}
        >

        </NextSeo>
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <PageDescription 
                title={ project.name }
                description={ project.name }
            />
            <Box textAlign="center">
                <Button variant="contained" size="large">
                    Project Link
                </Button>
            </Box>
            <Box>
                <Image 
                    src={ project.imageUrl}
                    width={900}
                    height={550}
                    alt={ `Image of the project ${project.name}` }

                />
                {/* <img src={ project.image } alt={`Image of the project ${project.name}`}></img> */}
            </Box>
            <h1>Project Overview</h1>
            <Box>
                <span>{project.description}</span>
            </Box>
            <h1>Tools Used</h1>
            <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1}}>
                {
                    project.tools.map( tool => (
                        <Chip key={tool} label={tool} />
                    ))
                }
            </Box>
            <Link href={'/projects'}>
                <Button variant="contained" size="large">
                    Go back
                </Button>
            </Link>
        </Grid>
    </>;
}

// export async function getServerSideProps( context ){
//     const id = context.params.id;

//     try{
//         const response = await fetch(`http://localhost:3000/api/projects/${ id }`);
//         const project = await response.json();
//         return{
//             props: {
//                 project,
//             }
//         }
        
//     }catch(error){
//         console.log(error)
//     }

// }

export async function getStaticPaths() {
    try {
        const response = await fetch(`http://localhost:3000/api/projects`);
        const projects = await response.json();
        const paths = projects.map( project => {
            return {
                params: { id: project._id.toString() }
            }
        })

        return{
            paths,
            fallback: "blocking"
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getStaticProps({ params }){
    try {
        const response = await fetch(`http://localhost:3000/api/projects/${ params.id }`)
        const project = await response.json();

        return {
            props: {
                project
            },
            revalidate: 5,
        }
    } catch (error) {
        return { notFound: true }
        
    }

}