import { Console } from '@woowacourse/mission-utils';
import Controller from '../src/controller/Controller.js';
import inputView from '../src/view/InputView.js';

jest.mock('../src/view/InputView.js', () => ({
  __esModule: true,
  default: {
    readLineMessage: jest.fn(),
  },
}));

// __esModule을 추가해야지 Babel 트랜스파일된 코드에서 ESM의 default를 붙여준 거라, mock 구조가 ESM 형식에 맞게 설정

//     Received: [Function mockConstructor]
// -> logSpy는 문자열이 아니라 jest mock 함수이므로 toHaveBeenCalledWith를
describe('Controller 클래스 E2E 테스트', () => {
  it('입력 : 1,2:3 | 출력 : 결과 : 6', async () => {
    inputView.readLineMessage.mockImplementationOnce(() => '1,2:3');
    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    await controller.run();
    expect(logSpy).toHaveBeenCalledWith('결과 : 6');
  });

  it('음수 입력시 ERROR 반환', async () => {
    inputView.readLineMessage.mockImplementationOnce(() => '-1,2:3');
    const controller = new Controller();
    await expect(controller.run()).rejects.toThrow('[ERROR]');
  });

  it('입력이 한개인 경우 -1,', async () => {
    inputView.readLineMessage.mockImplementationOnce(() => '1,');
    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    await controller.run();
    expect(logSpy).toHaveBeenCalledWith('결과 : 1');
  });

  it('//;\\n1 커스텀 구분자 사용', async () => {
    inputView.readLineMessage.mockImplementationOnce(() => '//;\\n1');
    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    await controller.run();
    expect(logSpy).toHaveBeenCalledWith('결과 : 1');
  });

  it('입력 : 1.2,2.3:3.4 | 출력 : 결과 : 6.9', async () => {
    inputView.readLineMessage.mockImplementationOnce(() => '1.2,2.3:3.4');
    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    await controller.run();
    expect(logSpy).toHaveBeenCalledWith('결과 : 6.9');
  });
});
