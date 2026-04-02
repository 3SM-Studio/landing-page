import { cwd } from 'node:process';

export const runtime = 'nodejs';

const workspaceUuid = process.env.DEVTOOLS_WORKSPACE_UUID;
const workspaceRoot = process.env.DEVTOOLS_WORKSPACE_ROOT || cwd();

function isDevelopmentEnvironment() {
  return process.env.NODE_ENV !== 'production';
}

// Dev-only endpoint for Chrome DevTools Automatic Workspace connection.
// If not configured, it intentionally behaves as if the file does not exist.
export async function GET() {
  if (!isDevelopmentEnvironment()) {
    return new Response(null, { status: 404 });
  }

  if (!workspaceUuid) {
    return new Response(null, { status: 404 });
  }

  return Response.json(
    {
      workspace: {
        root: workspaceRoot,
        uuid: workspaceUuid,
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
