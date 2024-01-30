//rfc
import "./list.scss"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import ListItem from "../ListItem/ListItem"
import { useRef, useState } from "react"

//{list} -> is a props getting from Home.js
export default function List({list}) {
    //for selecting particular component 
    const listRef = useRef()

    const [isMoved, setisMoved] = useState(false);
    const [slideNumber, setslideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth  / 230 );

    const handleClick = (direction) => {
        setisMoved(true)

        let distance = listRef.current.getBoundingClientRect().x - 50

        if (direction === "left" && slideNumber > 0) {
            setslideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }

        if (direction === "right" && slideNumber < 10-clickLimit) {
            setslideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }

    }
    return (
        <div className="list">
            {/* {list.title} -> using this we can fetch our data on front end */}
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined className="sliderArrow left" onClick={() => handleClick("left")} style={{display: !isMoved && "none"}}/>
                <div className="container" ref={listRef}>

                    {list.content.map((item,i)=>(
                        <ListItem index={i} item={item}/>
                    ))}
                    
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick("right")} />

            </div>
        </div>
    )
}

