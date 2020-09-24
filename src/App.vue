<template>
	<v-app>
		<app-nav/>
		<v-main>
			<router-view></router-view>
		</v-main>
		<v-footer color="primary lighten-1" padless>
			<v-layout justify-center wrap>
				<v-flex primary lighten-2 py-4 text-center white--text xs12>
					{{ new Date().getFullYear() }} —
					<strong>Vuetify Dashboard</strong>
				</v-flex>
			</v-layout>
		</v-footer>
	</v-app>
</template>

<script>
import AppNav from '@/components/AppNav'

export default {
  components: { AppNav },
  name: 'App',
}
</script>
