import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import VideoPin from './VideoPin'

const Recommend = ({recommended}) => {
    console.log(recommended)
  return (
   <>
    {
        recommended && (<>
            <SimpleGrid 
            minChildWidth='300px' 
            spacing='15px' 
            width={'full'}
            autoColumns={'max-content'}
            overflowX={'hidden'}
       >
          {
            recommended && recommended?.map((item)=>(
              <VideoPin 
                key={item.id} 
                maxWidth={420} 
                height='30px'
                data={item}
                 />
            ))
          }
      </SimpleGrid>
        </>
        )
    }
   </>
  )
}

export default Recommend