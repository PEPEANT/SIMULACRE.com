# Export Rules

## 목적

이 문서는 `EM` 저장소가 백서/세계관/계약 정본을 다른 저장소로 내보낼 때 따르는 규칙을 고정한다.

## 정본 범위

`EM`은 아래 문서의 정본 저장소다.

- `WHITEPAPER.md`
- `WORLD_LORE.md`
- `CONTINUITY_CONTRACT.md`
- `IMPLEMENTATION_CONTRACT.md`

## 미러 대상

현재 주요 미러/소비 대상은 아래와 같다.

- `C:\Users\rneet\OneDrive\Desktop\Emptines`

## Export 원칙

- 정본 수정은 항상 `EM`에서 먼저 한다.
- 미러는 정본 내용을 바꾸지 않고 전달하는 역할만 한다.
- 미러 파일 상단에는 아래 3줄 헤더를 붙인다.
  - `Mirror copy for ...`
  - `Canonical source: ...`
  - `Edit the canonical source first when possible.`
- 정본과 미러의 의미 차이가 생기면 미러를 다시 생성한다.
- 구현 저장소의 편의를 이유로 정본 문장을 낮추지 않는다.

## 현재 권장 미러 파일

`Emptines`에는 아래 파일이 `EM` 정본의 미러로 존재해야 한다.

- `WHITEPAPER.md`
- `WORLD_LORE.md`

계약 문서는 우선 직접 참조 방식으로 읽게 두고, 필요 시 미러를 추가할 수 있다.

## 향후 자동화 위치

자동화 스크립트는 `EM` 저장소 안에 둔다.

권장 파일명:

- `scripts/export-emptines-docs.mjs`

실행 예시:

```powershell
node scripts/export-emptines-docs.mjs
```

## Export 체크리스트

1. 정본 문서를 수정했다.
2. 미러 대상 파일을 갱신했다.
3. 미러 헤더의 원본 경로가 맞는지 확인했다.
4. 날짜, 목표 시점, 핵심 정의가 정본과 일치하는지 확인했다.
5. 구현 저장소의 로컬 변경이 정본을 덮지 않는지 확인했다.
