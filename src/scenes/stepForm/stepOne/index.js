import React from 'react';

import UploadIcon from '../../../assets/Upload.png'

import './index.css';

export default props => (
        <div className="step-one">
            <h4>Selection et depot des conterus a importer</h4>
            <div className="step-box d-flex flex-column justify-content-center align-items-center p-3">
                <div className="mb-2">
                    <img src={UploadIcon} alt="" />
                </div>
                <p className="file-upload">Drag & drop your files and&nbsp; <br />
                    <label htmlFor="step-files">click here&nbsp;
                        <input type="file" multiple id="step-files" onChange={e => props.uploadFiles(e.target.files)} />
                    </label>
                    to upload.
                </p>
            </div>
        </div>
);
