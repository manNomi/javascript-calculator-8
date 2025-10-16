import { Console } from '@woowacourse/mission-utils';
import Controller from '../src/controller/Controller.js';

// __esModule을 추가해야지 Babel 트랜스파일된 코드에서 ESM의 default를 붙여준 거라, mock 구조가 ESM 형식에 맞게 설정
jest.mock('../src/view/InputView.js', () => ({
  __esModule: true,
  default: {
    readLineMessage: jest.fn(() => '1,2:3'),
  },
}));

//     Received: [Function mockConstructor]
// -> logSpy는 문자열이 아니라 jest mock 함수이므로 toHaveBeenCalledWith를
describe('Controller 클래스 E2E 테스트', () => {
  it('입력 : 1,2:3 | 출력 : 결과 : 6', async () => {
    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    await controller.run();
    expect(logSpy).toHaveBeenCalledWith('결과 : 6');
  });
});
