import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Title from "../components/h2/Title";

const Root = () => 
{
    return (
        <div className="items-center justify-center flex flex-col m-4">
            <div className="flex flex-col w-full justify-center items-center">
                <Title title={"Iniciar Sesión"}></Title>
                <LoginForm></LoginForm>
            </div>

            <div className="flex flex-col w-full items-center justify-center mt-12">
                <Title title={"Registrarse"}></Title>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Root;