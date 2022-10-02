export default function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 2;
  let afterPage = page + 2;
  if (page > 4) {
    liTag += `<li class="btn prev numb" id=${
      page - 1
    }><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }
  if (page > 2) {
    liTag += `<li class="first numb" id=1><span>1</span></li>`;
    if (page > 4) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  if (page === totalPages) {
    beforePage = beforePage - 2;
  } else if (page === totalPages - 1) {
    beforePage = beforePage - 1;
  } else if (page === totalPages - 2) {
    afterPage = totalPages - 1;
  }

  if (page === 1) {
    afterPage = afterPage + 2;
    if (totalPages === 3) {
      afterPage = page + 1;
    }
  } else if (page === 2) {
    afterPage = afterPage + 1;
  } else if (page === 3) {
    beforePage = 2;
  }

  for (let i = beforePage; i <= afterPage; i += 1) {
    if (i < 1) {
      continue;
    }
    if (i > totalPages) {
      continue;
    }
    if (i === 0) {
      i = i + 1;
    }
    if (page === i) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<li class="numb ${active}" id=${i}><span>${i}</span></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" id=${totalPages}><span>${totalPages}</span></li>`;
  }
  if (page < totalPages - 3) {
    liTag += `<li class="btn next numb" id=${
      page + 1
    }><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  // element.innerHTML = liTag;
  return liTag;
}
