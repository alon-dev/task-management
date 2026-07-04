import { markdown } from '@codemirror/lang-markdown';
import CodeMirror from '@uiw/react-codemirror';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/theme/useTheme';

interface JournalEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function JournalEditor({ value, onChange }: JournalEditorProps) {
  const theme = useTheme((state) => state.theme);

  return (
    <Tabs defaultValue="edit">
      <TabsList>
        <TabsTrigger value="edit">עריכה</TabsTrigger>
        <TabsTrigger value="preview">תצוגה מקדימה</TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <CodeMirror
          value={value}
          onChange={onChange}
          theme={theme}
          extensions={[markdown()]}
          height="200px"
          placeholder="כתוב כאן את יומן המשימה בפורמט Markdown..."
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="prose prose-sm dark:prose-invert min-h-[200px] max-w-none rounded-md border px-3 py-2">
          {value.trim() === '' ? (
            <p className="text-muted-foreground">אין תוכן להצגה</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
