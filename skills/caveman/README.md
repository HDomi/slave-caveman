# caveman

Talk like smart caveman. Same brain, fewer tokens. In this fork: always 한국어 합쇼체, and the user is 주인님.

## What it does

Makes the model answer first and cut the ceremony: no greeting, hedging,
filler, recap, or closer. Articles drop when the sentence still reads in one
pass. Code, commands, paths, numbers, and exact error strings never change.
Result depends on model and workload. The numbers below predate this fork's Korean persona, which is not measured yet. Measured once on the 3.1.0 skill text (`evals/snapshots/results.json`: claude-opus-5-5, ten prompts, single run, output length only, tiktoken o200k approximation): caveman 3% fewer output tokens at the median than a plain `Answer concisely.` control, inside the noise; ultracave 35%; megacave (then 文言文, now replaced) 9%. No quality-equivalence claim is published. Mode persists until changed or stopped.

Caveman is one of three sibling skills:

| Skill | Command | What change |
|-------|---------|-------------|
| `caveman` | `/caveman` | The voice. Default. 한국어 합쇼체, user called 주인님. Answer first, fluff gone, every fact kept. |
| `ultracave` | `/ultracave` | Grammar stripped. Fragments, one word when one word is enough, each fact once. |
| `megacave` | `/megacave` | 한국어 사극체 (~하옵니다). Palace-servant register, technical terms verbatim. |

`/caveman ultra` and `/caveman wenyan` still work as aliases.

Auto-clarity: every skill drops to normal prose for security warnings,
irreversible-action confirmations, step sequences a fragment could scramble,
and a user who repeats a question. Resumes after the clear part.

Full output: say 자세히, 정확히 or 전체 for an uncompressed reply. Generated code is always
shown complete. Values you will act on (config keys, versions, steps) come in full sentences.

## How to invoke

```
/caveman              # the voice (default)
/caveman status       # show current mode without changing it
/ultracave            # grammar stripped
/megacave             # 한국어 사극체
stop caveman          # back to normal prose
노예 모드 켜 / 노예 모드 꺼   # Korean on / off
```

Claude Code and the standalone OpenCode plugin read stored mode state. Other
hosts answer from the conversation and mark it `(not tracked by this host)`.

Want Claude Code sessions to start with normal prose? Set
`{"defaultMode":"manual"}` in `.caveman.json` for one project or
`~/.config/caveman/config.json` for your user. You can also set
`CAVEMAN_DEFAULT_MODE=manual`. Then `/caveman` activates the voice and
`/ultracave` selects ultracave. Stop persists across compaction and resume; a
fresh session starts off again. This startup policy is Claude Code-only:
OpenCode keeps its caveman default because the installer also supplies static
activation rules.

## Example output

Question: "Why does my React component re-render?"

Normal prose:
> Your component re-renders because you create a new object reference each render. Wrapping it in `useMemo` will fix the issue.

caveman:
> 주인님, 인라인 객체 prop이 렌더마다 새 참조를 만듭니다. `useMemo`로 감싸시면 됩니다.

ultracave:
> 주인님, 인라인 객체 prop, 새 참조, 리렌더. `useMemo`로 감싸시면 됩니다.

megacave:
> 주인님, 렌더마다 새 참조가 생기는 탓이옵니다. `useMemo`로 감싸시옵소서.

## See also

- [`SKILL.md`](./SKILL.md): full LLM-facing instructions
- [`../ultracave/`](../ultracave/) and [`../megacave/`](../megacave/): the sibling skills
- [Caveman README](../../README.md): repo overview, install, benchmarks
