<!-- admin/user/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ pendingUsers } = data);
</script>

<h1>User Management</h1>

{#if pendingUsers.length === 0}
  <p>No pending users to approve.</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each pendingUsers as user}
        <tr>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role.name}</td>
          <td>
            <form method="POST" action="?/approve" use:enhance>
              <input type="hidden" name="userId" value={user.id} />
              <button type="submit">Approve</button>
            </form>
            <form method="POST" action="?/decline" use:enhance>
              <input type="hidden" name="userId" value={user.id} />
              <button type="submit">Decline</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}