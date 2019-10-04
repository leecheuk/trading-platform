import React from "react";

function SettingForm(props) {
    function onClickSubmit(e) {
        e.preventDefault();
        props.onSubmitAPI(props.apiKey);
    }
    return (
        <form className="form-inline setting-form" onSubmit={onClickSubmit}>
            <label className="sr-only" htmlFor="inlineFormToken">API TOKEN</label>
            <input type="text" name="api_key" className="form-control mb-2 mr-sm-2" id="inlineFormToken" 
                placeholder="new API Token" value={props.apiKey} onChange={props.onChangeAPI} autoFocus/>

            <button type="submit" className="btn btn-primary mb-2">Save</button>
        </form>
    )
}

export default SettingForm;