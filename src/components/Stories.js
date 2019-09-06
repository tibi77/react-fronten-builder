import React from 'react';
import {Rnd} from 'react-rnd';
import {useState} from 'react';
import {style} from '../styles/style.js'

export default function Stories(props) {
    const [state, setState] = useState({
        x:0,
        y:0
    });
    const [imageSize, setImageSize] = useState( {
        width: "100px",
        height: "100px"
    });
    const [textResize, setTextResize] = useState(
        {
            font: "1"
        }
    );

    function setPosition(e) {
        setState(e);
    }

    return ( (props.img === undefined) ? <div></div> :
        <div id={"" + props.number + props.orientation}>
            <Rnd
            className={"imageParent" + props.number + props.orientation}
            bounds={"."+props.orientation+"BG"}
            onDrag={(e, d) => {
              setPosition({ x: d.x, y: d.y });
            }}
            onResize={(e, direction, ref, delta, position) => {
                setImageSize({
                    width: ref.offsetWidth - 100,
                    height: ref.offsetHeight - 100,
                });
                setPosition({
                    x:position.x,
                    y:position.y,
                })
            }}
            style={style}>
                <div>
                    <img style={{padding:"10px", width:imageSize.width, height:imageSize.height}} src={props.img.img} alt={props.img.img}></img>
                </div>
            </Rnd>

            <Rnd
            className={"textParent" + props.number + props.orientation}
            position={{
                x: state.x,
                y: state.y
            }}
            onDrag={(e, d) => {
              setPosition({ x: d.x, y: d.y });
            }}
            onResize={(e, direction, ref, delta, position) => {
                setTextResize({
                    font: (ref.offsetWidth + ref.offsetHeight) / 100
                });
            }}
            bounds={".imageParent" + props.number + props.orientation}
            style={style}>
                <div> <h1 style={{fontWeight:"normal", fontSize: textResize.font+"vw"}}> {props.text}</h1></div>
            </Rnd>
        </div>
    );
}
