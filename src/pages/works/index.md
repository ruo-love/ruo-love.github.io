 <script setup>
import githubCotribution from '../components/githubCotribution/index.vue';
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '../avatar.png',
    name: 'Zero',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/ruo-love' }
    ]
  }
]
</script>
<!-- <githubCotribution/> -->

<!-- #### 作品集 -->

<!-- | name        |      time      |  doc |  link |
| ------------- | :----------: | ----: |----: |
| col 3 is      | right-aligned | $1600  | $1600 |
| col 2 is      |   centered    |   $12  |   $12 |
| zebra stripes |   are neat    |    $1  |    $1 | -->

<VPTeamMembers size="small" :members="members" />
