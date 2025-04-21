import React from 'react'
import SectionWrapper from './sectionWrapper'
import ExcerciseCard from './ExcerciseCard'

export default function Workout(props) {
    const { workout } = props
  return (
    <SectionWrapper id={'workout'} header={"Welcome To"} 
    title={['The', 'Danager', 'Zone']}>
        <div className='flex flex-col gap-4'>
            {workout.map((excercise, i) => {
                return(
                    <ExcerciseCard i={i} excercise={excercise} key={i} />
                )
            })}
        </div>

    </SectionWrapper>
  )
}
