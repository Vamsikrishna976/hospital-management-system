import { lazy, Suspense, useState, useCallback } from "react";
import useAIChat from "../../hooks/useAIChat";
import DashboardLayout from "../../layouts/DashboardLayout";
import QuickPrompts from "../../components/ai/actions/QuickPrompts";
import ChatWindow from "../../components/ai/chat/ChatWindow";
import ChatInput from "../../components/ai/chat/ChatInput";
import PatientSelector from "../../components/ai/patient/PatientSelector";
import usePatients from "../../hooks/usePatients";
import usePatientContext from "../../hooks/usePatientContext";

const PatientContextCard = lazy(
  () => import("../../components/ai/PatientContextCard"),
);

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [showPatientInfo, setShowPatientInfo] = useState(true);
  const { patients } = usePatients();

  const { context, loadingContext } = usePatientContext(selectedPatient);

  const { messages, loading, sendMessage } = useAIChat();

  const handleSend = useCallback(() => {
    sendMessage(prompt, selectedPatient);

    setPrompt("");
  }, [prompt, selectedPatient, sendMessage]);

  const handleQuickPrompt = useCallback((text: string) => {
    setPrompt(text);
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🤖 AI Medical Assistant</h1>

        {/* Patient Selector */}
        <PatientSelector
          patients={patients}
          selectedPatient={selectedPatient}
          onSelect={(id) => {
            setSelectedPatient(id);
            setShowPatientInfo(true);
          }}
          showPatientInfo={showPatientInfo}
          onTogglePatientInfo={() => setShowPatientInfo(!showPatientInfo)}
        />
        {/* Patient Context Card */}
        {showPatientInfo && (
          <Suspense
            fallback={
              <div className="bg-white rounded-xl shadow-md p-6">
                Loading Patient Context...
              </div>
            }
          >
            <PatientContextCard context={context} loading={loadingContext} />
          </Suspense>
        )}

        {/* Quick Prompts */}
        <QuickPrompts onSelect={handleQuickPrompt} />

        {/* Chat Window */}
        <ChatWindow messages={messages} loading={loading} />

        {/* Input */}
        <ChatInput
          prompt={prompt}
          loading={loading}
          onChange={setPrompt}
          onSend={handleSend}
        />
      </div>
    </DashboardLayout>
  );
}
