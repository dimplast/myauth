<script context="module">
  export async function load({ page, fetch, session, context }) {
    if (!session) {
      return {
        status: 302,
        redirect: '/auth'
      }
    }
    return {
      props: {
        session
      }
    }
  } 
</script>

<form action="/logout" method="get">
  <button>
    Log out
  </button>
</form>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>