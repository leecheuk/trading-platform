import React from "react";

function SettingForm() {
    function onClickSubmit(e) {
        e.preventDefault();
    }
    return (
        <form className="form-inline setting-form" onSubmit={onClickSubmit}>
            <label className="sr-only" for="inlineFormToken">API TOKEN</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormToken" 
                placeholder="new API Token" autoFocus/>

            <button type="submit" className="btn btn-primary mb-2">Save</button>
        </form>
    )
}

export default SettingForm;