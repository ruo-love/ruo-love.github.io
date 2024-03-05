---
layout: page
---

 <script setup>

import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/avatar.png',
    name: 'Zero',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/ruo-love' }
    ]
  }
]
</script>

<VPTeamMembers size="small" :members="members" />
