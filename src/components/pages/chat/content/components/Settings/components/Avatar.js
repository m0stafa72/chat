import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor'

import axios from 'axios';
import ApiUrl from './../../../../../../../ApiUrl.json';


class Avatar extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            progressBarStatus : false,
            progressBarWidth : 0,
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    
   
    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            progressBarStatus : false,
            progressBarWidth : 0,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }


    onClickSave = () => {
        if (this.editor) { 
            this.setState({
                progressBarStatus : true,
            });

            const canvas = this.editor.getImageScaledToCanvas();
            canvas.toBlob((blob) => {

            const data = new FormData()
                data.append("file", blob, "filename.jpg");
                data.append("_enctype", 'multipart/form-data');

                const token = localStorage.getItem('api_token');
                if (token !== null) {
                    const {Url} = ApiUrl;
                    const {user_key} = this.props.user;

                    const instance = axios.create({
                        baseURL : Url,
                        headers : {
                            Authorization : 'Bearer '+token,
                        }
                    });
                    instance.post('/Auth/avatar/'+user_key , data,{
                        onUploadProgress : ProgressEvent => {
                            console.log('loaded : ' + ProgressEvent.loaded);
                            console.log('total : ' + ProgressEvent.total);
                            // console.log('asli : ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100 ));
                            this.setState({
                                progressBarWidth : Math.round(ProgressEvent.loaded / ProgressEvent.total * 100 ),
                            });
                        }
                    }).then(response => {
                        console.log(response);
                        if (response.data.status === 'ok') {
                            setTimeout(() => {
                                this.props.handelLogin();
                            },700);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }


            }, "image/jpeg", 95)


           

        }
    }

        
    

    
    setEditorRef = editor => {
        if (editor) this.editor = editor
    }

    render() {
        let {imagePreviewUrl} = this.state;
        
        return (
            <div>
                
                {
                    imagePreviewUrl ? (
                        <div className="text-center">
                            
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={imagePreviewUrl}
                                width={200}
                                height={200}
                                border={50}
                                color={[55, 136, 185, 0.5]} // RGBA
                                scale={1.5}
                                rotate={0}
                                borderRadius={100}
                                className="editor-canvas"
                            />
                            <p>میتوانید تصویر را جابجا نمایید و محدوده ای که میخواهید را انتخاب کنید </p>
                        </div>
                    ) : (null)
                }
                {
                    (this.state.progressBarStatus) ? (
                        <div className="progress margin-top-20">
                            <div className="progress-bar progress-bar-success progress-bar-striped" role="progressbar"  style={{'minWidth': '0%','maxWidth': '100%','width': this.state.progressBarWidth+'%' }}>
                                {this.state.progressBarWidth}%
                            </div>
                        </div>
                    ) : (' ')
                }

                <input type="file" id="file" onChange={this._handleImageChange} style={{'visibility' : 'hidden'}} />
                <button type="button" 
                        onClick={() => document.getElementById("file").click()} 
                        className={["btn btn-base" , imagePreviewUrl ? 'danger-light' : 'success-light'].join(' ')} >
                            {
                                imagePreviewUrl ? (
                                    <span>انتخاب تصویری دیگر</span>
                                ) : (
                                    <span>انتخاب تصویر</span>
                                )
                            }
                </button>

                {
                    imagePreviewUrl ? (
                        <button onClick={this.onClickSave} className="btn btn-base green-dark margin-right-15"><i className="fa fa-upload"></i> آپلود تصویر</button>
                    ) : (null)
                }
               </div>
            
        );
    }
}

export default Avatar;