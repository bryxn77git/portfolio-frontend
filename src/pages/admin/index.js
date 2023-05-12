
import PageDescription from "@/components/PageDescription";
import ProjectItem from "@/components/ProjectItem";
import AddNewProjectModal from "@/components/modals/AddNewProjectModal";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";


export default function AdminPage() {

    const [projects, setProjects] = useState([]);
    const [isNewProjectModalVisible, setIsNewProjectModalVisible] = useState(false)

    useEffect(() => {
      fetchProjects();
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/projects");
            const responseJson = await response.json();

            setProjects(responseJson);

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = values => {
        setProjects( prev => [
            ...prev, 
            { ...values, _id: projects.length + 1}
        ] )
    }
    

    return (
        <section>
            <PageDescription 
                title="Admin" 
                description="Here you will able to add and update your projects"
            />

            <div style={{ textAlign: 'center', marginBottom: '40px'}}>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={ () => setIsNewProjectModalVisible(true) }
                >
                    Add new project
                </Button>
            </div>

            { projects.map( project => <ProjectItem key={ project._id} project={project} />)}
        
            <AddNewProjectModal 
                open={ isNewProjectModalVisible } 
                onClose={ () => setIsNewProjectModalVisible(false) }
                onSubmit={ handleSubmit }
            /> 
        </section>
    )
}
