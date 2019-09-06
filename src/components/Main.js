import React, { useState } from 'react';
import horizontal from '../images/horizontal.png';
import vertical from '../images/vertical.png';
import Stories from "./Stories";
import GenerateOutput from "./GenerateOutput.js";


export default function Main(props) {
    const [state, setStory] = useState({
        stories: []
    });

    function createFile(e) {
        GenerateOutput(state.stories);
    }

    function uploadImage(event) {
        var text = window.prompt("sometext","defaultText");
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setStory({
                stories: [...state.stories, {img : URL.createObjectURL(img), text : text}]
            });
        }
        document.getElementById("uploadImage").value = null;
    }

    return (
        <div style={{display:"flex",flexWrap:"wrap", flexDirection:"row", width:"2000px"}}>
            <input type="file" id="uploadImage" name="uploadImage" onChange={uploadImage}/>
            <button onClick={createFile}> nu_stiu </button>
            <div style={{position:"relative", display: "flex", flexWrap:"wrap"}}>
                <div style={{positon:"relative", zIndex:"-1",  width:"600px", height:"1270px"}}>
                    <img src={vertical} alt="vertical"/>
                </div>

                <div style={{position:"relative", zIndex:"-1", height:"600px", width:"1270px"}}>
                    <img src={horizontal} alt="horizontal"/>
                </div>

                <div style={{overflowY:"auto", overflowX:"hidden", position:"absolute", top:"30px", left:"669px", height:"545px", width:"1140px"}}>
                    <div className="horizontalBG" style={{position: "absolute", height: '1000px', width:"1130px"}}>
                    {
                        state.stories.map( (item, key) => {
                            return (<Stories orientation="horizontal" img={item} number={key} key={key} text={item.text}/>);
                        })
                    }
                    </div>
                </div>

                <div style={{alignSelf:"stretch", overflowY:"auto", overflowX:"hidden", position:"absolute", top:"77px", left:"30px", width:"560px", height:"1125px"}}>
                    <div className="verticalBG" style={{position: "absolute", height: '2000px', width:"530px"}}>
                    {
                        state.stories.map( (item, key) => {
                            return (<Stories orientation="vertical" img={item} number={key} key={key} text={item.text}/>);
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )

} 