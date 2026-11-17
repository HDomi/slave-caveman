// Korean natural-language on/off triggers in src/hooks/caveman-parse.js.
// Hangul has no `\b`, so the parser anchors each verb to the end of a clause;
// these cases pin both the phrases that must fire and the near-misses
// (negation, how-to questions, DB replication "slave" talk) that must not.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { parseModeChange } = require('../../src/hooks/caveman-parse.js');

const parse = (prompt) => parseModeChange(prompt, { getDefaultMode: () => 'caveman' });

test('Korean activation phrases switch to the default mode', () => {
  for (const prompt of ['노예 모드 켜', '노예 모드 켜줘', '노예모드 켜주세요', '슬레이브 모드 시작', 'caveman 모드 활성화', '노예 모드']) {
    assert.deepEqual(parse(prompt), { action: 'set', mode: 'caveman' }, prompt);
  }
});

test('Korean deactivation phrases clear the mode', () => {
  for (const prompt of ['노예 모드 꺼', '노예모드 꺼줘', '노예 모드 종료', 'caveman 모드 해제', '슬레이브 모드 그만해', '평소 말투로 돌아가', '원래 말투로 말해줘', '이제 일반 모드로 돌아와']) {
    assert.deepEqual(parse(prompt), { action: 'clear' }, prompt);
  }
});

test('negations, how-to questions and unrelated prose do not toggle the mode', () => {
  for (const prompt of ['노예 모드 켜지 마', '노예 모드 끄지 마', '노예 모드 켜는 법 알려줘', 'slave 중지', 'replication slave 해제 방법', '이 함수 그만 수정해', '일반 모드로 빌드하는 법']) {
    assert.equal(parse(prompt), null, prompt);
  }
});

test('quoted Korean triggers are ignored', () => {
  assert.equal(parse('버그 리포트: "노예 모드 꺼" 라고 쓰면 꺼진다'), null);
});
