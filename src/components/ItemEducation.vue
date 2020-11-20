<template>
  <v-card-text class="py-0">
    <p class="subtitle-0">Год окончания: {{ finish_year }}</p>
    <p class="subtitle-0">Вид: {{ vid_edu }}</p>
    <p class="subtitle-0">Уч. заведение: {{ uch_edu }}</p>
    <p class="subtitle-0">Специальность: {{ specialnost }}</p>
    <p class="subtitle-0">Квалификация: {{ kvalification }}</p>
    <v-divider></v-divider>
   </v-card-text>
   
  
    <!-- <v-card>
      <v-card-title class="pt-0">Основное</v-card-title>
      <v-timeline align-top dense >
          <v-timeline-item color="pink">
            <v-row  justify="start" align="start">
              <v-col cols="1">
                <strong>{{ finish_year }}</strong>
              </v-col>
              <v-col class="pt-0">
                <v-card-title class="pt-0">{{ vid_edu }}</v-card-title>
                <v-card-text class="pt-0">{{ uch_edu }}</v-card-text>
                <v-card-text class="pt-0">{{ specialnost }}</v-card-text>
                <v-card-text class="pt-0">{{ kvalification }}</v-card-text>
                
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
     
    </v-card> -->
</template>
  

<script>
export default {
    name: "ItemEducation",
    props: [
        "vid_edu",
        "uch_edu",
        "specialnost",
        "diplom",
        "finish_year",
        "kvalification"
    ],
    mounted() {
      
    }

};
</script>

<style scoped></style>