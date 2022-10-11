import {
  useState,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "preact/hooks";

function requestReducer(
  state: RequestState,
  action: RequestAction
): RequestState {
  return (
    {
      SEND: { ...state, status: "pending" },
      SUCCESS: { ...state, status: "complete" },
      ERROR: { ...state, status: "complete" },
    }[action.type] || state
  );
}

function useRequest(requestFunction: any, startWithPending = false) {
  const [reqState, dispatch] = useReducer(requestReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendReq = async (resquestData?: any) => {
    dispatch({ type: "SEND" });
    try {
      const responseData = await requestFunction(resquestData);
      dispatch({ type: "SUCCESS", responseData });
    } catch (err: any) {
      dispatch({
        type: "ERROR",
        errorMessage: err.message || "something wrong",
      });
    }
  };

  return {
    sendReq,
    ...reqState,
  };
}

export default useRequest;
