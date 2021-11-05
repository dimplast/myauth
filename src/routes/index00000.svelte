<script>
  import supabase from '$lib/db'
  
  let newGame
  let newPlayers
  let submit = false
  
  async function getData() {
	  const { data, error } = await supabase.from('games').select()
		if (error) throw new Error(error.message)
        console.log(data)
		return data
	}
  
  async function sendData() {
    const { data, error } = await supabase.from('games').insert([{ 'name': newGame, 'players' : newPlayers }])
    if (error) throw new Error(error.message)
    return data
  }
</script>

<h1>My favorite games</h1>
{#await getData()}
  <p>Fetching data...</p>
{:then data}
  {#each data as game}
    <li>{game.name} - {game.players}</li>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}

<form on:submit|preventDefault={() => submit = true}>
  <input type="text" bind:value={newGame}>
  <input type="number" bind:value={newPlayers}>

  <input type="submit" value="Submit" on:click={() => submit = false}>
</form>
{#if submit}
  {#await sendData()}
    <p>Sending data...</p>
  {:then data}
    <p>Succesfully sent data.</p>
  {:catch error}
    <p>Something went wrong while sending the data:</p>
    <pre>{error}</pre>
  {/await}
{/if}