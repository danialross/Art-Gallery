import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTotalArtworkPages } from "@/utils/apiUtils";
import { Dispatch, useState, SetStateAction } from "react";

type PaginationBarProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const PaginationBar = ({ page, setPage }: PaginationBarProps) => {
  const { data: totalPageNum = null, isLoading: isLoadingTotalPageNum } =
    useQuery({
      queryKey: ["pages"],
      queryFn: getTotalArtworkPages,
    });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1}
            className={"text-small sm:text-medium"}
          >
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>
        {page > 2 && (
          <>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => setPage(1)}
                className={"text-small sm:text-medium"}
              >
                1
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <p className={"p-2 underline text-small sm:text-medium"}>{page}</p>
        </PaginationItem>

        {isLoadingTotalPageNum && (
          <PaginationItem>
            <Button variant={"outline"} className={"text-small sm:text-medium"}>
              <div className="h-4 bg-gray-200 rounded-full w-[50px] mb-2.5 mx-auto my-auto animate-pulse"></div>
            </Button>
          </PaginationItem>
        )}

        {totalPageNum && page < totalPageNum - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis className={"text-small sm:text-medium"} />
            </PaginationItem>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => setPage(totalPageNum)}
                className={"text-small sm:text-medium"}
              >
                {totalPageNum}
              </Button>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => setPage((page) => page + 1)}
            disabled={page === totalPageNum}
            className={"text-small sm:text-medium"}
          >
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
