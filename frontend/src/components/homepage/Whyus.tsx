import { faChartBar, faChartDiagram, faClock, faDesktop, faGear, faGears, faMicrochip, faRobot, faShield, faShieldAlt, faUsers, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const data = [
    {
        id: 1,
        title: 'AI-Powered Insights',
        description: 'Use AI to generate reports that boost your focus and performance.',
        icon: faMicrochip,
        gradientStart: '#007991',
        gradientEnd: '#78ffd6',
        rotation: '30',
    },
    {
        id: 2,
        title: 'Simplify Your Workday',
        description: 'Effortlessly manage tasks, track progress, and achieve your goals one step at a time.',
        icon: faDesktop,
        gradientStart: '#ff00cc',
        gradientEnd: '#333399',
        rotation: '0',
    },
    {
        id: 3,
        title: 'Achieve Your Goals Faster',
        description: 'Gain personalized insights to uncover strengths and enhance productivity.',
        icon: faChartBar,
        gradientStart: '#fc6767',
        gradientEnd: '#ec008c',
        rotation: '0'
    },
    {
        id: 4,
        title: 'Tailored for Everyone',
        description: 'Personalize your experience, set goals, and celebrate your achievements.',
        icon: faGears,
        gradientStart: '#C02425',
        gradientEnd: '#F0CB35',
        rotation: '0'
    },
    {
        id: 5,
        title: 'Collaborate & Share',
        description: 'Pick a plan that suits your needs and unlock tools to boost your productivity.',
        icon: faUsers,
        gradientStart: '#f857a6',
        gradientEnd: '#ff5858',
        rotation: '0'
    },
    {
        id: 6,
        title: 'Security and Privacy',
        description: 'Find answers and guidance in our support center to maximize your success.',
        icon: faShieldAlt,
        gradientStart: '#AA076B',
        gradientEnd: '#61045F',
        rotation: '0'
    },
]

type FeatureProps = {
    id: number,
    title: string,
    description: string,
    icon: IconDefinition,
    gradientStart: string,
    gradientEnd: string,
    rotation: string,
}

const Whyus = () => {
    const [items, setItems] = useState<FeatureProps[]>(data);
    const [visibleItem, setVisibleItem] = useState<number>(1)

    const showDescription = (id: number) => {
        setVisibleItem(id)
    }

    return (
        <div className="features p-4  justify-center items-center">
            <div className="heading p-6 flex flex-col">
                <h2 className='text-6xl text-center w-full openSans-Bold my-16 justify-center items-center drop-shadow-2xl'>Why Choose BlahBlah?</h2>
                <div className='flex flex-row'>
                    <div className="left">
                        {
                            items.map((eachItem) => (
                                <div
                                    key={eachItem.id}
                                    style={{
                                        background: `
                                          radial-gradient(#141414, #1e1e1e) padding-box,
                                          linear-gradient(145deg, transparent 44%, #4158d0, #c850c0, #ffcc70) border-box`,
                                        border: "2px solid transparent",
                                    }}
                                    className="border-2 p-4 flex w-56 h-24 text-lg text-center openSans-SemiBold items-center justify-center rounded-xl mt-2"                                    
                                    onMouseEnter={() => showDescription(eachItem.id)}
                                >
                                    {eachItem.title}
                                </div>
                            ))
                        }
                    </div>
                    {
                        items.map((eachItem) => (
                            <div className={`${eachItem.id != visibleItem ? 'hidden ' : ''} right pl-10 min-h-[728px]`}
                                key={eachItem.title}
                            >
                                <div
                                    className="bentoCard flex-col displayDetailCard h-full w-full p-10 rounded-xl overflow-hidden relative"                                 
                                >
                                    <h3 className='text-2xl drop-shadow-md bg-white text-black w-fit p-2 openSans-SemiBold'>{eachItem.title}</h3>
                                    <div className='text-8xl openSans-Bold drop-shadow-sm leading-tight'>
                                        {eachItem.description}
                                    </div>
                                    <FontAwesomeIcon icon={eachItem.icon} className={`absolute right-10 bottom-10 text-[20rem] opacity-30 rotate-[${eachItem.rotation}deg] text-gray-100 `} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default Whyus;