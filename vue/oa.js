ffunction getOAItems (kind, time) {
  const list = document.body.querySelectorAll('.tblList tr');
  const items = [];
  for (let index = 0; index < list.length; index++) {
      const tr = list[index];
      if (tr.textContent.indexOf(kind) >= 0) {
          const item = {
              kind
          };
          const times = tr.children[3].textContent.replace(/\s+/g, "").split('〔');
          item.date = times[0] + ' ' + time;
          item.day = times[1].replace('〕', '');
          const list = tr.children[5].textContent.replace(/\s+/g, "").split('〔1份〕');
          list.length = list.length - 1;
          item.mark = list.join('、');
          items.push(item);
      }
  }
  const result = JSON.stringify(items);
  console.log(result);
}
getOAItems('早餐', '08:35');
getOAItems('午餐', '11:30');
