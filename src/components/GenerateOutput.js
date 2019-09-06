
export default function GenerateOutput(stories) {
    if (stories.length === 0)
        return;

    let output = [];

    for (let id = 0; id < stories.length; id++) {
        let handler = {};
        let image_src;
        let text_info;
        for (let orientation of ["horizontal", "vertical"]) {
            let container_img = document.getElementsByClassName("imageParent" + id + orientation)[0];
            let container_text = document.getElementsByClassName("textParent" + id + orientation)[0];
            const image = container_img.childNodes[0].childNodes[0];
            image_src = image.src;

            const text = container_text.childNodes[0].childNodes[1];
            const parent = container_img.parentNode.parentNode.parentNode;

            const image_x = calculateProcentage(image.getBoundingClientRect().top, parent.getBoundingClientRect().top, parent.getBoundingClientRect().height);
            const image_y = calculateProcentage(image.getBoundingClientRect().left, parent.getBoundingClientRect().left, parent.getBoundingClientRect().width);
            const image_width = image.getBoundingClientRect().width * 100.0 / parent.getBoundingClientRect().width;
            const image_height = image.getBoundingClientRect().height * 100.0 / parent.getBoundingClientRect().height;
            const text_font = text.style.fontSize;
            const text_x = calculateProcentage(text.getBoundingClientRect().top, parent.getBoundingClientRect().top, parent.getBoundingClientRect().height);
            const text_y = calculateProcentage(text.getBoundingClientRect().left, parent.getBoundingClientRect().left, parent.getBoundingClientRect().width);

            text_info = text.outerText;
            handler[orientation] = {
                image: {
                    width: image_width, // procents from the parent view width
                    height: image_height, ///dasda
                    position: {
                        x: image_x, // procents from parent width, height
                        y: image_y,
                    },
                    style: {
                        // IDK
                    },
                },
                text: {
                    style: {
                        color: "#FFFF",
                        text_font: text_font,
                    },
                    position: {
                        x: text_x,
                        y: text_y
                    }
                }
            };
        }

        let new_object = {
            source: image_src,
            style: {
                placeholder: "the container_img?"
            },
            handlers: {
                onPress: () => {
                    console.log('On press out !');
                },
                onPressOut: () => {
                    console.log('On press out !');
                },
                onPressIn: () => {
                    console.log('On press in !');
                },
            },
            portain: handler.vertical.image,
            landscape: handler.horizontal.image,
            text: [{
                portain: handler.vertical.text,
                landscape: handler.horizontal.text,
                data: text_info,
                handlers: {
                    onPress: () => {
                        console.log('On press text!');
                    },
                    onPressOut: () => {
                        console.log('On press out text!');
                    },
                    onPressIn: () => {
                        console.log('On press in text!');
                    },
                },
            },
            ],
        };
        output.push(new_object);
    };
    download(JSON.stringify(output), "positions.json", "application/json")
    console.log(output)
}


const calculateProcentage = (xChild, xParent, maxParent) => {
    return (xChild - xParent) * 100.0 / maxParent;
};
const download = (data, filename, type) => {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0);
    }
}