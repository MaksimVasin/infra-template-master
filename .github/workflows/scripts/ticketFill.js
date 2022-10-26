import fetch from 'node-fetch';

const {TOKEN, ORGID, ACTOR, TAG} = process.env;

const ticketFill = async () => {
  fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143', {
    method: 'PATCH',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: `{
      "summary": "Релиз ${ TAG } - ${ new Date().toLocaleDateString() }", 
      "description": "Ответсвтенный за рерлиз: ${ ACTOR }"
    }`
  });
}

ticketFill();

/* url: https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143
      #    method: PATCH
      #    payload: '{"summary": "Кросс-проверка Инфраструктура — Васин Максим", "description": "Описание из экшанов с секретом"}'
      #    headers: '{"Authorization": "OAuth ${{ env.TOKEN }}", "X-Org-ID": "${{ env.ORGID }}"}' */