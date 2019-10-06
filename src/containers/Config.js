import React, {useState, useEffect} from "react";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";
import db from "../api/db";

function Config() {
    const [apiKey, setApiKey] = useState("");
    const [curApi, setCurApi] = useState("");
    useEffect(() => {
        db.getAPI((api) => {
            setCurApi(api);
        });
        return () => {
            db.removeAPIListener();
        }
    }, [curApi]);
    function onChangeAPI(e) {
        setApiKey(e.target.value);
    }
    function onSubmitAPI(apiKey) {
        db.updateAPI(apiKey);
        setCurApi(apiKey);
    }
    return (
        <>
            <BlockList>
                <BlockListItem
                    title="API Key"
                    subtitle={`Current key: ${JSON.stringify(curApi)}`}
                    onChangeAPI={onChangeAPI}
                    onSubmitAPI={onSubmitAPI}
                    apiKey={apiKey}
                />
            </BlockList>
        </>
    );
}

export default Config;