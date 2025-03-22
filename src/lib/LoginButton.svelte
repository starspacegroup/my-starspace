<script>
  import { signIn } from "../auth";
  export let callbackUrl = '/dashboard';

</script>

<button on:click={signIn}>Sign In with Discord</button>

<style>
  button {
    padding: 10px 20px;
    background-color: #5865F2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #4752C4;
  }
</style>