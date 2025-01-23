import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { LanguageItem } from "../../types";

export const Template1Column = ({
  data,
  color,
}: {
  data: any;
  color: string;
}) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      lineHeight: 1.5,
      color: color,
    },
    section: {
      marginBottom: 20,
      paddingBottom: 10,
      borderBottom: "1px solid #ccc",
    },
    heading: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: "bold",
      color: "#000",
    },
    text: {
      marginBottom: 5,
    },
    listItem: {
      marginLeft: 10,
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Data Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Personal Data</Text>
          <Text style={styles.text}>Name: {data.personalData.fullName}</Text>
          <Text style={styles.text}>Email: {data.personalData.email}</Text>
          <Text style={styles.text}>
            Telephone: {data.personalData.telephone}
          </Text>
          <Text style={styles.text}>
            Location: {data.personalData.city} ({data.personalData.country})
          </Text>
        </View>

        {/* Summary Section */}
        {data.optionalData?.summary && (
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text style={styles.text}>{data.optionalData?.summary}</Text>
          </View>
        )}

        {/* Skills Section */}
        {data.optionalData?.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            {data.optionalData?.skills.map((skill: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {skill}
              </Text>
            ))}
          </View>
        )}

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          {data.experience.items.map(
            (
              exp: {
                startDate: string;
                finishDate: string;
                companyName: string;
                positionName: string;
                summary: string;
                currentlyWorking: boolean;
              },
              index: number
            ) => (
              <View key={index} style={styles.text}>
                <Text style={styles.text}>
                  {exp.currentlyWorking
                    ? `{exp.startDate} - (today) at {exp.companyName}`
                    : `{exp.startDate} - {exp.finishDate} at {exp.companyName}`}
                </Text>
                <Text style={styles.text}>Position: {exp.positionName}</Text>
                <Text style={styles.text}>{exp.summary}</Text>
              </View>
            )
          )}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {data.education.items.map(
            (
              edu: { year: string; center: string; degree: string },
              index: number
            ) => (
              <View key={index} style={styles.text}>
                <Text style={styles.text}>
                  ({edu.year}) {edu.degree} at {edu.center}
                </Text>
              </View>
            )
          )}
        </View>

        {/* Languages Section */}
        {data.optionalData?.languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Languages</Text>
            {data.optionalData.languages.map(
              (language: LanguageItem, index: number) => (
                <Text key={index} style={styles.listItem}>
                  • {language.language} - Level: {language.level}
                </Text>
              )
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};
