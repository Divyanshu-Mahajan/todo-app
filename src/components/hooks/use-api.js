import { useCallback, useReducer } from "react";

function apiReducer(state,action){
    if(action.type === "SEND"){
        return{
            status : "pending",
            data : null,
            error : null
        }
    }
    if(action.type === "SUCCESS"){
        return{
            status : "completed",
            data : action.responseData,
            error : null
        }
    }
    if(action.type === "ERROR"){
        return{
            status : "completed",
            data : null,
            error : action.errorMessage
        }
    }

    return state;
}

function useApi(requestFunction,startWithPending = false){

    const [apiState,dispatch] = useReducer(apiReducer,{
        // initial state
        status : startWithPending ? 'pending' : null,
        data : null,
        error : null
    })

    const sendRequestForApi = useCallback(
        async function (requestData) {
            // send api request so type is SEND
            dispatch({
                type : 'SEND'
            })

            try{
                const responseData = await requestFunction(requestData);
                dispatch({
                    type : 'SUCCESS',
                    responseData
                })
            } catch(error){
                dispatch({
                    type : 'ERROR',
                    errorMessage : error.message || "Something went Wrong"
                })
            }
        },[requestFunction]);

        return{
            sendRequestForApi,
            ...apiState
        }
}

export default useApi;