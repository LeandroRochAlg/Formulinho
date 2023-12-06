import '../../styles/auth/aboutcss.css';
import Coworker from '../../components/Coworker';
import workers from '../../assets/workers.json';



const About = () => {
    document.title = 'Sobre';
    return (
        <div className='abt-body'>
            <div className='abt-body-container'>
                {workers.map((coworker, index) => (
                    <Coworker
                        key={index}
                        nome={coworker.nome}
                        cargo={coworker.cargo}
                        desc={coworker.desc}
                        img={coworker.img}
                    />
                ))}
            </div>
        </div>
    );
}

export default About;