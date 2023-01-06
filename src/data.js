import{GrGamepad} from 'react-icons/gr';
import{RiEmotionLaughLine} from 'react-icons/ri';
import { MdOutlineHistoryEdu} from 'react-icons/md'
import {BiMoviePlay,BiGame} from 'react-icons/bi'

export const categories = [
    {
        id:1,
        name: 'Games',
        iconSrc: <BiGame  fontSize={26} />
    },
     {
        id:2,
        name: 'Funny',
        iconSrc: <RiEmotionLaughLine  fontSize={26} />
    },
    {
        id:1,
        name: 'Stories',
        iconSrc:<MdOutlineHistoryEdu  fontSize={26} />
    },
    {
        id:1,
        name: 'Movies',
        iconSrc:<BiMoviePlay fontSize={26}  />
    },
]