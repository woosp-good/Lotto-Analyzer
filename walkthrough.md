# Lotto Analyzer Walkthrough

요청하신 **로또 1210회 대비 필터링 설정**이 적용된 분석기를 완성했습니다.

## 1. 구현된 기능
- **LottoFilter 클래스**: 모든 필터 로직이 `lotto_analyzer.py`에 구현되었습니다.
    - 합계, AC, 홀짝, 저고, 연번 필터
    - **핵심 업데이트**: 3, 4, 5의 배수와 소수가 **1개만 나와도 허용** (1~4개)
- **CLI 도구**: `main.py`를 통해 번호를 생성하거나 검증할 수 있습니다.
- **테스트**: `test_analyzer.py`로 모든 필터가 정상 작동함을 확인했습니다.

## 2. 사용 방법

### 번호 생성
```powershell
python main.py --gen 5
```

### 번호 검증
```powershell
python main.py --check 10 12 23 29 33 45
```

## 3. GitHub 업로드 방법

저는 사용자의 GitHub에 직접 푸시할 권한이 없습니다. 아래 명령어를 터미널에 복사/붙여넣기하여 직접 업로드해 주세요.

```powershell
# 현재 디렉토리에서 Git 초기화
git init

# 모든 파일 스테이징
git add .
# 또는
git add lotto_analyzer.py main.py README.md

# 커밋
git commit -m "Add Lotto Analyzer v1.0"

# 원격 저장소 연결 (본인의 레포 주소 확인 필요)
git remote add origin https://github.com/woosp-good/-Lotto-Analyzer.git

# 푸시
git push -u origin main
```
