import React, { createContext } from 'react'
import '../public/css/ImageUpload.css'

const dragDrop = require('drag-drop')

const ImageUpload = (props) => {

    const [imageSelected, setImageSelected] = React.useState(null);
    const setImage = props.setImage;

    React.useEffect(() => {
        // You can pass in a DOM node or a selector string!
        dragDrop('#dropTarget', (files, pos, fileList, directories) => {
            const file = files[0];

            if (!(file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) {
                console.log(file.type);
                console.log("Not supported files");
                return;
            }

            // convert the file to a Buffer that we can use!
            const reader = new FileReader()
            reader.addEventListener('load', e => {
                // e.target.result is an ArrayBuffer
                console.log("entre por aca ejje");
                const arr = new Uint8Array(e.target.result)
                const buffer = new Buffer(arr)
                var arrayBufferView = new Uint8Array(buffer);
                var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                setImageSelected(imageUrl);
                setImage(file);
            })
            reader.addEventListener('error', err => {
                console.error('FileReader error' + err)
            })
            reader.readAsArrayBuffer(file)
        })
    }, [setImage])


    const chooseFile = (e) => {
        const file = e.target.files[0];

        if (file === undefined) {
            console.log("No se selecciono imagen")
            return;
        }

        if (!(file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) {
            console.log(file.type);
            console.log("Not supported files");
            return;
        }

        // FileReader support
        if (FileReader && file) {
            var fr = new FileReader();
            fr.onload = function () {
                setImageSelected(fr.result);
            }
            fr.readAsDataURL(file);
            // setImageSelected(fr.readAsDataURL(file));
            setImage(file);
        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }

        // setImageSelected(img);
        
        
    }


    return (
        <div id="image-upload" >
            <div id="dropTarget">
                <img id="img" src={imageSelected} alt=""/>
            </div>
            <div className="custom-file" style={{ textAlign: "center" }}>
                <input
                    type="file"
                    className="custom-file-input"
                    id="pic"
                    aria-describedby="inputGroupFileAddon04"
                    onChange={chooseFile}
                    style={{ display: "none" }}
                />
                <label className="choose-pic btn btn-dark mt-2" htmlFor="pic">Picture</label>
            </div>
        </div>

    )
}

export default ImageUpload
