# noxwrotekeplercodes

## Kimi agent zip deployment

The deployment package is available from:

- `GET /api/kimi-agent-zip`

Example branch-based deploy flow (using `;` command chaining):

```bash
git checkout -b deploy/kimi-agent-v14; curl -L http://localhost:3000/api/kimi-agent-zip -o Kimi_Agent_Deployment_v14.zip
```
