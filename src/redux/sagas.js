import { all } from 'redux-saga/effects';

import {
  put, call, takeLatest, select
} from 'redux-saga/effects';

import API from "../services/api";
import { findCollection } from "../scenes/notice/utils";

export const onFetch = async (action)=> {
  const notice = await API.getNotice(action.base, action.ref);
  return notice;
}

export const onCollectionFetch = async (notice, base)=> {
  if(base === "memoire") {
    const arr = [];
    const collection = findCollection(notice.LBASE);
    if (collection) {
      arr.push(API.getNotice(collection, notice.LBASE));
    } else {
      console.log("Cant get notice of ", notice.LBASE);
    }
  
    const values = await Promise.all(arr);
    const links = [];
    for (let i = 0; i < values.length; i++) {
      if (!values[i]) {
        console.log("IMPOSSIBLE DE CHARGER LA NOTICE");
      } else {
        links.push(values[i]);
      }
    }
    return links;
  } else if(base === "merimee") {
    const { RENV, REFP, REFE, REFO } = notice;
      // RENV -> MERIMEE
      // REFP -> MERIMEE
      // REFE -> MERIMEE
      // REFO -> PALISSY
      const arr = [];
      for (let i = 0; Array.isArray(RENV) && i < RENV.length; i++) {
        arr.push(API.getNotice("merimee", RENV[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; Array.isArray(REFP) && i < REFP.length; i++) {
        arr.push(API.getNotice("merimee", REFP[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; Array.isArray(REFE) && i < REFE.length; i++) {
        arr.push(API.getNotice("merimee", REFE[i]));
        if (arr.length > 50) break;
      }
      for (let i = 0; Array.isArray(REFO) && i < REFO.length; i++) {
        arr.push(API.getNotice("palissy", REFO[i]));
        if (arr.length > 50) break;
      }
      
      const values = await Promise.all(arr);
      const links = [];
      for (let i = 0; i < values.length; i++) {
        if (!values[i]) {
          console.log("IMPOSSIBLE DE CHARGER LA NOTICE");
        } else {
          links.push(values[i]);
        }
      }
      return links;
  } else if(base === "palissy") {
    const { RENV, REFP, REFE, REFA, LBASE2, REF } = notice;
      // RENV -> MERIMEE
      // REFP -> MERIMEE
      // REFE -> MERIMEE
      // REFA -> MERIMEE
      // LBASE2 -> MERIMEE
      const arr = [];
      [...RENV, ...REFP, ...REFE, ...REFA, LBASE2]
        .filter(e => e && e != REF)
        .forEach(e => {
          const collection = findCollection(e);
          arr.push(API.getNotice(collection, e));
        });

      const values = await Promise.all(arr);
      const links = [];
      for (let i = 0; i < values.length; i++) {
        if (!values[i]) {
          console.log("IMPOSSIBLE DE CHARGER LA NOTICE");
        } else {
          links.push(values[i]);
        }
      }
      return links;
  }
  
}

function* onFetchRedux(action) {
    const notice = yield call(onFetch, action);
    if(!action.withLinks) {
      yield put({
          type: "notice/DID_FETCH",
          notice,
          links: null,
      });
    } else {
      const links = yield call(onCollectionFetch, notice, action.base);
      yield put({
        type: "notice/DID_FETCH",
        notice,
        links,
      });
    }
}

function* appSaga() {
  yield takeLatest("notice/WILL_FETCH", onFetchRedux);
}

export default function* rootSaga(getState) {
  yield all([
    appSaga(),
  ]);
}
