import React, { Component } from 'react';
import axios from 'axios'

class ImageUpload extends Component<{value: string, imageChanged: any}> {
    image = '';
    upload = async (files: FileList | null)=>{
        if(files === null) return ;
        const data = new FormData();
        data.append('image', files[0]);
        const response = await axios.post('upload',data);
        this.image = response.data;


        this.props.imageChanged(this.image)
    }

    render() {
        return (
            <div className="input-group">
                <input
                type="text"
                id="image"
                className="form-control"
                placeholder="Image"
                value={this.props.value}
                onChange={(e)=> this.image = e.target.value}
                />

                <div className="input-group-append">
                    <label className="btn btn-primary">
                        Upload
                        <input type="file" hidden onChange={e=> {this.upload(e.target.files);  this.props.imageChanged(this.image)}}/>
                    </label>
                </div>

          </div>
        );
    }
}

export default ImageUpload;
