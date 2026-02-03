# Lotto Analyzer (로또 분석기)

사용자가 정의한 필터링 규칙에 따라 로또 6/45 번호를 생성하고 분석하는 도구입니다.

## 기능

- **번호 생성**: 설정된 필터를 모두 통과하는 번호 조합 생성
- **번호 검증**: 특정 번호 조합이 필터를 통과하는지 검증 및 상세 리포트 제공

## 필터링 조건 (v1210 대비)

1.  **총합 구간**: 96 ~ 175
2.  **AC 값**: 8, 9, 10
3.  **홀짝 비율**: 2:4, 3:3, 4:2 허용 (0:6, 6:0, 1:5, 5:1 제외)
4.  **저고 비율**: 2:4, 3:3, 4:2 허용 (1-23: 저, 24-45: 고)
5.  **배수 필터 (3, 4, 5의 배수)**: 각각 1~4개 허용 (0개 또는 5개 이상 제외)
6.  **소수(Prime) 필터**: 1~4개 허용
7.  **연번 필터**:
    - 3연번 2세트 이상 제외
    - 4연번 이상 제외

## 사용 방법

### 1. 실행 준비
파이썬이 설치되어 있어야 합니다.

### 2. 번호 생성
valid한 번호조합 5개를 생성하려면:
```bash
python main.py --gen 5
```

### 3. 번호 검증
특정 번호(예: 1 2 3 4 5 6)를 검증하려면:
```bash
python main.py --check 1 2 3 4 5 6
```

### 4. 대화형 모드
옵션 없이 실행하면 메뉴가 나타납니다:
```bash
python main.py
```

## GitHub에 업로드하기

이 프로젝트를 GitHub 저장소에 올리려면 다음 명령어를 터미널에 입력하세요.

```bash
# 1. git 초기화 (이미 되어있다면 생략 가능)
git init

# 2. 파일 추가
git add .

# 3. 커밋
git commit -m "Lotto Analyzer v1.0: 1210회차 필터 적용"

# 4. 원격 저장소 연결 (본인의 레포지토리 주소로 변경)
git remote add origin https://github.com/woosp-good/-Lotto-Analyzer.git
# 만약 이미 origin이 있다면: git remote set-url origin https://github.com/woosp-good/-Lotto-Analyzer.git

# 5. 푸시
git push -u origin main
# 또는 강제로 덮어씌우려면: git push -u origin main --force
```
