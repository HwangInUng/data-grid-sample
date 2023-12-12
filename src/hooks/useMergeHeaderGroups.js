
export const useMergeHeaderGroups = (tableHeaderGroups) => {
  const headerGroups = tableHeaderGroups;
  const headerIds = new Set(); // 동일한 컬럼명 중복 방지
  const resultHeaderGroups = [];

  if (headerGroups.length === 1) return headerGroups;

  for (let i = 0; i < headerGroups.length; i++) {
    const headerGroup = i === 0 ? headerGroups[i].headers : resultHeaderGroups[i];

    // 행 객체 평면화
    const preHeaders = headerGroup.map(header =>
      header.isPlaceholder ?
        {
          ...header,
          isPlaceholder: false,
          rowSpan: tableHeaderGroups.length - i
        } :
        { ...header, rowSpan: 1 }
    );
    resultHeaderGroups.pop(); // 마지막 배열을 꺼냄
    resultHeaderGroups.push(preHeaders); // 수정된 배열을 저장
    preHeaders.forEach(preHeader => headerIds.add(preHeader.column.id)); // 현재까지 보유한 header 누적

    const targetHeaders = headerGroups[i + 1].headers;
    const newHeaders = targetHeaders.filter(header => !headerIds.has(header.column.id));
    resultHeaderGroups.push(newHeaders);

    if (i === headerGroups.length - 2) {
      break;
    }
  }
  return resultHeaderGroups;
};