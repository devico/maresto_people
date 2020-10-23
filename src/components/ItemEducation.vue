<template>
    <v-card>
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
     
    </v-card>
        <!-- <v-list-item class="mt-5">
            <v-list-item-content>
                <v-list-item-title>{{ vid_edu }}</v-list-item-title>
                <v-list-item-subtitle class="mt-2"
                    >Учебное заведение: {{ uch_edu }}</v-list-item-subtitle
                >
                <v-list-item-subtitle class="mt-2"
                    >Специальность: {{ specialnost }}</v-list-item-subtitle
                >
                <v-list-item-subtitle class="mt-2"
                    >Диплом: {{ diplom }}</v-list-item-subtitle
                >
                <v-list-item-subtitle class="mt-2"
                    >Год окончания: {{ finish_year }}</v-list-item-subtitle
                >
                <v-list-item-subtitle class="mt-2"
                    >Квалификация: {{ kvalification }}</v-list-item-subtitle
                >
            </v-list-item-content>
        </v-list-item> -->
        
    
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
    ]
};
</script>

<style scoped></style>