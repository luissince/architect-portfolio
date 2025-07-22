"use client"

import { AboutPersonal, useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, GraduationCap, Briefcase } from "lucide-react"

export default function AboutSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("story")

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("aboutTitle").toString()}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/iam.jpeg"
                alt="Architect portrait"
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              <span className="text-primary dark:text-accent">{t("aboutFullName").toString()}</span> - <span className="text-primary dark:text-accent">{t("aboutProfession").toString()}</span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{t("aboutText").toString()}</p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {/* <div>
                <h4 className="font-semibold text-lg mb-2">{t("aboutEducation").toString()}</h4>
                <ul className="space-y-2 text-sm">
                  {
                    (t("aboutEducationList") as string[]).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))
                  }
                </ul>
              </div> */}
              <div>
                <h4 className="font-semibold text-lg mb-2">{t("aboutExperience").toString()}</h4>
                <ul className="space-y-2 text-sm">
                  {
                    (t("aboutExperienceList") as string[]).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Historia personal y logros */}
        <div className="mt-16">
          <Tabs defaultValue="story" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="story" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{t("aboutPersonalTabOne").toString()}</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>{t("aboutPersonalTabTwo").toString()}</span>
                </TabsTrigger>
                <TabsTrigger value="background" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{t("aboutPersonalTabThree").toString()}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="story" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{t("aboutPersonalTitle").toString()}</h3>
                    {
                      (t("aboutPersonalStory") as string[]).map((item: string, index: number) => (
                        <p key={index} className="text-muted-foreground">{item}</p>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">{t("aboutAchievementsTitle").toString()}</h3>
                    <div className="space-y-6">
                      {(t("aboutAchievements") as AboutPersonal[]).map((achievement, index) => (
                        <div key={index} className="flex gap-4">
                          {/* <div className="flex-shrink-0 w-16 text-center">
                            <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium">
                              {achievement.year}
                            </span>
                          </div> */}
                          <div>
                            {/* <h4 className="font-semibold">{achievement.title}</h4> */}
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="background" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-semibold">{t("aboutEducationsTitle").toString()}</h3>
                      </div>
                      <div className="space-y-6">
                        {(t("aboutEducations") as AboutPersonal[]).map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-24 text-center">
                              <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium">
                                {item.year}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.institution}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-semibold">{t("aboutExperiencesTitle").toString()}</h3>
                      </div>
                      <div className="space-y-6">
                        {(t("aboutExperiences") as AboutPersonal[]).map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-28 text-center">
                              <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium">
                                {item.period}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{item.title}</h4>
                              <p className="text-sm font-medium">{item.company}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
