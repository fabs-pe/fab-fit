import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from'../utils/excercises'
import Button from './Button'

function Header(props){
    const { index, title, description } = props
    return (
        <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-center gap-2'>
            <p className='text-3xl sm:text-4xl md:text-5xl'>
                {index}
            </p>
            <h4 className='text=xl sm:text-2xl md:text-3xl'>{title}</h4>
        </div>
            <p className='text-sm sm:text-base mx-auto'>
                {description}
            </p>
        </div>
    )
}

export default function Generator(props) {
    const { poison, setPosion, muscles, setMuscles, goal, setGoal, updateWorkout} = props

    const [showModal, setShowModal] = useState(false)


    function toggleModal() {
        setShowModal(!showModal)
    }

    function updateMuscles(musclesGroup) {
        if(muscles.includes(musclesGroup)) {
            setMuscles(muscles.filter(val => val !== musclesGroup))
            return
        }

        if (muscles.length > 2) {
            return
        }

        if (poison !== 'individual') {
            setMuscles([musclesGroup])
            setShowModal(false)
            return
        }

        setMuscles([...muscles, musclesGroup])
        if (muscles.length === 2){
            setShowModal(false)
        }
    }

  return (
    <SectionWrapper id={'generate'} header={"generate your workout"} 
    title={['It\'s', 'Huge', 'o\'clock']}>

       <Header index = {'01'} title={'Pick your poison'} description={"Select the workout you wish to endure."} />
       <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {Object.keys(WORKOUTS).map((type, typeIndex) => {
                return(
                    <button onClick={() => {setPosion(type)}}
                    className={'bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (type === poison ? ' border-blue-600' : ' border-blue-400')}
                        key={typeIndex}>
                            <p className='capitalize'>
                                {type.replaceAll('_', " ")}
                            </p>
                    </button>
                )
            })}
        </div>

        <Header index = {'02'} title={'Lock on targets'} description={"Select the muscles judged for annihilation"} />
       <div className='bg-slate-950  border border-soild border-blue-400 rounded-lg flex flex-col'>
            <button onClick={toggleModal}className='relative p-3 flex items-center justify-center'>
                <p className='capitalize'>{muscles.length == 0 ?'Select Muscle Groups' : muscles.join(' ') }</p>
                <i className='fa-solid absolute right-3 top-1/2
                        -translate-y-1/2 fa-caret-down'></i>

            </button>
            {showModal && (
                <div className='flex flex-col px-3 pb-3'>
                    {(poison === 'individual' ? 
                    WORKOUTS[poison] : Object.keys(WORKOUTS[poison]))
                    .map((musclesGroup, musclesGroupIndex) => {
                        return(
                            <button onClick={() => {
                                updateMuscles(musclesGroup)
                            }} key={musclesGroupIndex} className={'hover:text-blue-400 duration-200' + (muscles.includes(musclesGroup) ? 'text-blue-400' : ' ')}>
                                <p className='uppercase'>
                                    {musclesGroup.replaceAll('_', ' ')}
                                </p>
                            </button>
                            
                        )
                    })}

                
                </div>
            ) }
        </div>

        <Header index = {'03'} title={'Become Juggernait'} description={"Select your ultimate objective"} />
       <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
                return(
                    <button onClick={() => {setGoal(scheme)}}
                    className={'bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (scheme === goal ? ' border-blue-600' : ' border-blue-400')}
                        key={schemeIndex}>
                            <p className='capitalize'>
                                {scheme.replaceAll('_', " ")}
                            </p>
                    </button>
                )
            })}
        </div>
        
        <Button func={updateWorkout} text={'Formulate'} />

    </SectionWrapper>


  )
}
